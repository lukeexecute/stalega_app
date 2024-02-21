import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section className="main-container">
        <div className="w-full max-w-4xl">
          <SignIn />
        </div>
      </section>
    </>
  );
}
