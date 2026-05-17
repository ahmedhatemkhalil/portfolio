import PostsClient from "./PostsClient";
import { FakeStrategySection } from "@/components/fakeApi/FakeStrategySection";

export default function FakeApiClientPage() {
  return (
    <FakeStrategySection badge="Client">
      <PostsClient />
    </FakeStrategySection>
  );
}
