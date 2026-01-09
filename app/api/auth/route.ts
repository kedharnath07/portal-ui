
import { User, UserRole } from '../../../types';

export const POST = async (request: Request) => {
  try {
    const { email, role, password } = await request.json();

    if (!password || password.length < 3) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }
    
    const user: User = {
      id: `USR-${Math.floor(Math.random() * 10000)}`,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      role: role as UserRole,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      phone: "+1 (555) 902-3419",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      zipCode: "62704",
      memberSince: "January 2024",
      tier: "Elite",
      lastLogin: new Date().toLocaleString(),
      preferences: {
        notifications: true,
        smsAlerts: false,
        darkMode: false
      }
    };

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 401 });
  }
};
