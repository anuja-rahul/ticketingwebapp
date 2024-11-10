import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"

  
  export function AvatarIcon() {
    return (
      <Avatar className="">
        <AvatarImage src="https://assets.dryicons.com/uploads/icon/svg/5610/fff0263a-8f19-4b74-8f3d-fc24b9561a96.svg" alt="@shadcn"/>
        <Badge>Badge</Badge>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  