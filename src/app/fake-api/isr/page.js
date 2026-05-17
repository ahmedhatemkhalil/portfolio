import ServerPosts from "../ServerPosts";
import { FakeStrategySection } from "@/components/fakeApi/FakeStrategySection";

export const revalidate = 30;

export default async function FakeApiIsrPage() {
  return (
    <FakeStrategySection badge="ISR">
      <ServerPosts />
    </FakeStrategySection>
  );
}
