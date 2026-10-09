import Footer from "../_components/shared/Footer";
import Header from "../_components/shared/Header";
import MembershipBenefits from "./_components/sections/MembershipBenefits";
import MembershipCTA from "./_components/sections/MembershipCTA";
import MembershipEligibility from "./_components/sections/MembershipEligibility";
import MembershipHero from "./_components/sections/MembershipHero";
import MembershipOverview from "./_components/sections/MembershipOverview";
import MembershipProcess from "./_components/sections/MembershipProcess";
import MembershipRequirements from "./_components/sections/MembershipRequirements";

const page = () => {
  return (
    <>
      <Header />
      <MembershipHero />
      <MembershipOverview />
      <MembershipBenefits />
      <MembershipEligibility />
      <MembershipProcess />
      <MembershipRequirements />
      <MembershipCTA />
      <Footer />
    </>
  );
};

export default page;
