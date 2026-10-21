import { Suspense } from "react";
import VerificationForm from "./VerificationForm";
import Loader from "@/components/ui/loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <VerificationForm />
    </Suspense>
  );
}
