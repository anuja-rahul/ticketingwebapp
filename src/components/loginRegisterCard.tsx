import { User } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link";

interface LoginCardProps {
    text: string,
    url: string,
    placeholder: string
}

export default function LoginRegisterCard({ text, url, placeholder }: LoginCardProps) : JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center mt-2 w-2/5">
      <Alert className="border-secondary rounded-full flex flex-col items-center justify-center">
        <AlertTitle className="flex flex-row"><User className="h-4 w-4" />&nbsp; {text}</AlertTitle>
        <AlertDescription>
          <Link href={url} className="text-primary hover:underline duration-300">{placeholder}</Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}
