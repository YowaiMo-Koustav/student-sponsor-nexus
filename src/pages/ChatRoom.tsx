import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { demoConversations } from '@/data/demoConversations';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatRoom = () => {
  const { user } = useAuth();
  const [conversations] = useState(demoConversations);
  const [selectedConversation, setSelectedConversation] = useState(demoConversations[0] || null);
  const [messages, setMessages] = useState(selectedConversation ? [...selectedConversation.messages] : []);
  const [newMessage, setNewMessage] = useState('');

  // When a conversation is selected, update messages
  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    setMessages([...conv.messages]);
  };

  // Mock send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    const msg = {
      id: `msg-demo-${Date.now()}`,
      sender: 'student',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Conversations</h2>
          <ul className="space-y-2">
            {conversations.map((conv) => (
              <li
                key={conv.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedConversation?.id === conv.id ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                onClick={() => handleSelectConversation(conv)}
              >
                <div className="font-medium">{conv.student_org}</div>
                <div className="text-xs text-muted-foreground">{conv.status}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {conv.messages[conv.messages.length-1]?.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <ScrollArea className="h-full">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-4 flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'student' ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                    <div className="text-sm">{msg.content}</div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">{new Date(msg.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
            />
            <Button onClick={handleSendMessage} variant="default">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
