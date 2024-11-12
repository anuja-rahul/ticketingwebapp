'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Ticket, Calendar, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TicketPlatformLanding() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const ticket = ticketRef.current;
    const events = eventsRef.current;
    const features = featuresRef.current;
    const cta = ctaRef.current;

    if (hero) {
      gsap.fromTo(
        hero.querySelectorAll('.hero-text'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }

    if (ticket) {
      gsap.to(ticket, {
        y: 20,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    if (events) {
      const eventCards = events.querySelectorAll<HTMLElement>('.event-card');
      eventCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: true,
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    if (features) {
      gsap.fromTo(
        features.querySelectorAll('.feature-item'),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: features,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }

    if (cta) {
      gsap.fromTo(
        cta,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="container mx-auto px-4 py-24 text-center">
        <h1 className="hero-text mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Get Your Tickets to Amazing Events
        </h1>
        <p className="hero-text mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Discover and book tickets for the hottest concerts, sports events, and more!
        </p>
        <Button size="lg" className="hero-text animate-pulse">
          Find Events
        </Button>
        <div ref={ticketRef} className="mt-16">
          <Ticket className="mx-auto h-40 w-40 text-primary" />
        </div>
      </section>

      <section ref={eventsRef} className="container mx-auto px-4 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">Popular Events</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {['Rock Concert', 'Football Match', 'Tech Conference'].map((event, index) => (
            <Card key={index} className="event-card">
              <CardHeader>
                <CardTitle>{event}</CardTitle>
                <CardDescription>Dont miss out on this amazing event!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section ref={featuresRef} className="container mx-auto px-4 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Calendar, title: 'Easy Scheduling', description: 'Find events that fit your calendar' },
            { icon: Users, title: 'Group Bookings', description: 'Easily book for you and your friends' },
            { icon: Zap, title: 'Instant Confirmation', description: 'Get your tickets right away' },
          ].map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="feature-item flex items-center space-x-4">
              <Icon className="h-12 w-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className="container mx-auto px-4 py-24 text-center">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Never Miss an Event</CardTitle>
            <CardDescription>Sign up for our newsletter to stay updated on the latest events.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
