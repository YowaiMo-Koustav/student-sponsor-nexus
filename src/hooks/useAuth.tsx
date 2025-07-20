import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type UserRole = 'student' | 'sponsor';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { full_name?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // For demo mode, set role based on email or use a default
          const email = session.user.email;
          let role: UserRole = 'student'; // default
          
          if (email) {
            // Simple demo logic: if email contains 'sponsor', set as sponsor
            if (email.toLowerCase().includes('sponsor')) {
              role = 'sponsor';
            } else if (email.toLowerCase().includes('student')) {
              role = 'student';
            } else {
              // For demo, alternate between student and sponsor
              role = email.length % 2 === 0 ? 'student' : 'sponsor';
            }
          }
          
          setUserRole(role);
          console.log('Set user role to:', role);
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // For demo mode, set role based on email or use a default
        const email = session.user.email;
        let role: UserRole = 'student'; // default
        
        if (email) {
          // Simple demo logic: if email contains 'sponsor', set as sponsor
          if (email.toLowerCase().includes('sponsor')) {
            role = 'sponsor';
          } else if (email.toLowerCase().includes('student')) {
            role = 'student';
          } else {
            // For demo, alternate between student and sponsor
            role = email.length % 2 === 0 ? 'student' : 'sponsor';
          }
        }
        
        setUserRole(role);
        console.log('Set initial user role to:', role);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    try {
      console.log('Signing up with role:', role);
      
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role // Store role in user metadata
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        return { error: signUpError };
      }

      // Set role immediately for demo mode
      setUserRole(role);
      
      toast({
        title: "Account created successfully!",
        description: `Welcome ${fullName}! You are signed up as a ${role}.`,
      });

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in:', email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      // Set role based on email for demo mode
      let role: UserRole = 'student';
      if (email.toLowerCase().includes('sponsor')) {
        role = 'sponsor';
      } else if (email.toLowerCase().includes('student')) {
        role = 'student';
      } else {
        role = email.length % 2 === 0 ? 'student' : 'sponsor';
      }
      
      setUserRole(role);
      console.log('Set sign in role to:', role);

      toast({
        title: "Welcome back!",
        description: `You have successfully signed in as a ${role}.`,
      });

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRole(null);
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: { full_name?: string }) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);

      if (error) {
        return { error };
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};