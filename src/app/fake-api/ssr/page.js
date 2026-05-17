import ServerPosts from "../ServerPosts";
import { FakeStrategySection } from "@/components/fakeApi/FakeStrategySection";

export const dynamic = "force-dynamic";

export default async function FakeApiSsrPage() {
  return (
    <FakeStrategySection badge="SSR">
      <ServerPosts />
    </FakeStrategySection>
  );
}
