import ServerPosts from "../ServerPosts";
import { FakeStrategySection } from "@/components/fakeApi/FakeStrategySection";

export default async function FakeApiSsgPage() {
  return (
    <FakeStrategySection badge="SSG">
      <ServerPosts />
    </FakeStrategySection>
  );
}
