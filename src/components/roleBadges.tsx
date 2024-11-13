import { Badge } from "./ui/badge";

export function VendorBadge() {
  return (
    <Badge variant="outline" className="scale-75 bg-yellow-300/40 py-1 px-2">
      Vendors
    </Badge>
  );
}

export function CustomerBadge() {
  return (
    <Badge variant="outline" className="scale-75 bg-yellow-300/40 py-1 px-2">
      Customers
    </Badge>
  );
}

export function AdminBadge() {
  return (
    <Badge variant="outline" className="scale-75 bg-red-500/40 py-1 px-2">
      Admins
    </Badge>
  );
}

export function AnyBadge() {
  return (
    <Badge variant="outline" className="scale-75 bg-blue-500/40 py-1 px-2">
      Any
    </Badge>
  );
}
