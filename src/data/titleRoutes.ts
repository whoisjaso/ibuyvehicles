/*
  The title router. Every lead carries one of these route codes so the sale
  desk (next phase) can open the right paperwork path the moment Mark answers.
  Checklists follow Mark's own published requirements; Texas specifics are
  general guidance, Mark confirms per deal.
*/

export type TitleRoute = "in-hand" | "not-in-name" | "lost" | "salvage" | "dealer";

export const titleRoutes: Record<
  TitleRoute,
  { label: string; short: string; headline: string; bring: string[]; note: string }
> = {
  "in-hand": {
    label: "Yes, In My Name",
    short: "Title in hand",
    headline: "The Fastest Lane.",
    bring: ["The title, signed at pickup (not before)", "Your valid photo ID", "Every key and remote you have"],
    note: "After the sale, file a Vehicle Transfer Notification with TxDMV so the car is out of your name. Mark can show you how.",
  },
  "not-in-name": {
    label: "Yes, Not In My Name",
    short: "Title, different name",
    headline: "Very Common. Very Fixable.",
    bring: ["The title you have", "Your valid photo ID", "Anything linking you to the car: bill of sale, registration, insurance"],
    note: "Tell Mark whose name is on it. He'll tell you exactly what's needed before he drives out.",
  },
  lost: {
    label: "No, It's Lost",
    short: "Lost title",
    headline: "Lost Title? Still Sellable.",
    bring: ["Your valid photo ID", "Registration or insurance in your name", "The VIN (on the dash or driver door)"],
    note: "Mark handles the verification, so you can skip the tax-office line. Offers aren't lowered just because the paper is missing.",
  },
  salvage: {
    label: "Salvage Or Rebuilt",
    short: "Salvage / rebuilt",
    headline: "Branded Title, No Problem.",
    bring: ["The salvage or rebuilt title", "Your valid photo ID", "Any repair or inspection papers"],
    note: "Branded titles change the value, not whether Mark will buy it.",
  },
  dealer: {
    label: "I'm A Dealer",
    short: "Dealer unit",
    headline: "Aged Units, One Call.",
    bring: ["Title or MCO", "Dealer reassignment", "Stock number and keys"],
    note: "Mark buys direct. No auction run list, no waiting on a sale day.",
  },
};
