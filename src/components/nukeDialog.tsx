"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { getNukeData, getRole } from "@/app/lib/nuke";

export default function NukeDialog() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const getAuth = async () => {
    setIsLoading(true);
    try {
      const response = await getRole();
      setAuth(response.auth);
    } finally {
      setIsLoading(false);
    }
  };

  const getNukeStats = async () => {
    setIsLoading(true);
    try {
      if (auth) {
        const response = await getNukeData();
        if (response.data) {
          toast({
            variant: "default",
            title: "Successfully Nuked the server",
            description: "Thank you for using TicketingApp ",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed to Nuke the server",
            description: "Please try again later",
          });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Nuke the server",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-2/5 mt-10 min-h-[100px] bg-gradient-to-t from--muted-background/40 via-muted-foreground/10 to-muted-background/40">
      <CardHeader>
        <CardTitle className="mb-2">Terminate Server</CardTitle>
        <CardDescription className="mt-2">
          Are you sure you want to terminate the API server?
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-center items-center">
        {isLoading ? (
          "loading..."
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={!auth}>
                Terminate
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently terminate
                  the servers and they can only be restarted again from the
                  backend.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogCancel
                  className="bg-destructive hover:bg-destructive/80"
                  onClick={() => {
                    getNukeStats();
                  }}
                >
                  Continue
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
