import { User } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link";

export default function LoginCard() {
  return (
    <div className="flex flex-col items-center justify-center mt-2 w-2/5">
      <Alert className="border-secondary rounded-full flex flex-col items-center justify-center">
        <AlertTitle className="flex flex-row"><User className="h-4 w-4" />&nbsp; Already have an account ?</AlertTitle>
        <AlertDescription>
          <Link href="/auth/login" className="text-primary hover:underline duration-300">login</Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}
