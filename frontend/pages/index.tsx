import tags from "../utils/dummyUsers.json";
export default function Home() {
  let tagsID: string = "";
  tags.map((tag, i) => {
    tagsID = tagsID + ", " + `"${tag._id}"`;
  });
  console.log(tagsID);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
