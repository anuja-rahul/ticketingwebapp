import { Button } from "./ui/button";

function redirect() {
  window.location.href = "/docs/#securitylevels";
}

export default function LearnMoreBtn() {
  return (
    <Button
      variant={"link"}
      className="text-sm p-0 underline hover:no-underline duration-300 hover:translate-y-[-2px]"
      onClick={() => {
        redirect();
      }}
    >
      Learn More
    </Button>
  );
}
