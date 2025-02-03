import { currentUser } from "@clerk/nextjs/server";
import Wrapper from "../organisms/wrapper";

export default async function HomePage() {
  const { firstName } = await currentUser();

  return (
    <Wrapper>
      <header className="space-y-2">
        <h1 className="font-bold text-xl tracking-tight md:text-3xl lg:text-4xl">{`Welcome back, ${firstName}!`}</h1>
        <p className="text-muted-foreground">Pick up where you left off or try something new.</p>
      </header>
    </Wrapper>
  );
}
