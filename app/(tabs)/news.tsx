import ComingSoon from "@/components/ComingSoon";

export default function NewsScreen() {
  return (
    <ComingSoon
      emoji="📰"
      title="News"
      body="Ein kuratierter, begrenzter Nachrichten-Feed – bewusst ohne endloses Doomscrolling."
      bullets={[
        "Tageslimit statt endlosem Feed",
        "Konstruktive / Lösungs-Beiträge hervorgehoben",
        "Mix aus internationalen und Schweizer Quellen",
        "Speichern & in die Community teilen",
      ]}
    />
  );
}
