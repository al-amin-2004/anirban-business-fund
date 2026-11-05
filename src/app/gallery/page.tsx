import { Button } from "@/components/ui/button";
import ComingSoon from "../_components/ui/coming-soon";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <ComingSoon
        title="Gallery"
        description="Explore our gallery of inspiring stories, events, and moments that showcase the impact of Anirban Business Fund. From community initiatives to success stories, our gallery captures the essence of our mission and the people we serve."
      />
      <Link href="/" className="mt-4">
        <Button>Back to Home</Button>
      </Link>
    </>
  );
};

export default Page;
