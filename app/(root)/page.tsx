import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user)
    return (
      <>
        <h1 className="head-text mb-4 text-left">
          Verba volant, scripta manent
        </h1>
        <p className="text-white">
          Τα λόγια πετούν, τα γραπτά μένουν...γι' αυτό ότι και να λες στους
          φίλους σου, αν δεν καταγραφεί στο χρονοντούλαπο δεν σου δίνει το
          δικαίωμα να πεις μετά "Στάλεγα εγώ!..."
        </p>
        <h2 className="mb-4 mt-24 w-full text-heading4-medium text-light-1">
          Αν θέλετε να δείτε τις δηλώσεις των υπόλοιπων μελών θα πρέπει να
          κάνετε{" "}
          <Link className="underline" href={"/onboarding"}>
            Sign Up
          </Link>
          .
        </h2>
      </>
    );

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <h1 className="head-text mb-4 text-left">Verba volant, scripta manent</h1>
      <p className="text-white">
        Τα λόγια πετούν, τα γραπτά μένουν...γι' αυτό ότι και να λες στους φίλους
        σου, αν δεν καταγραφεί στο χρονοντούλαπο δεν σου δίνει το δικαίωμα να
        πεις μετά "Στάλεγα εγώ!..."
      </p>
      <section className="mt-14 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No statements found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
