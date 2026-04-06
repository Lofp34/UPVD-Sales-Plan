import type {
  AnswersState,
  FinalPlaybook,
  PlaybookLine,
} from "@/lib/workshop/types";

type BuildFinalPlaybookInput = {
  answers: AnswersState;
  participantName: string;
  startup: string;
};

function readAnswer(answers: AnswersState, stepId: string, fieldId: string) {
  return answers[stepId]?.[fieldId]?.trim() ?? "";
}

function compactLines(lines: PlaybookLine[]) {
  return lines.filter((line) => line.value.trim().length > 0);
}

function fallbackSentence(values: string[], emptyMessage: string) {
  const nonEmpty = values.map((value) => value.trim()).filter(Boolean);

  return nonEmpty.length > 0 ? nonEmpty.join(" ") : emptyMessage;
}

export function buildFinalPlaybook({
  answers,
  participantName,
  startup,
}: BuildFinalPlaybookInput): FinalPlaybook {
  const contactStructure = compactLines([
    {
      label: "Bris de glace",
      value: readAnswer(answers, "contact-builder", "icebreaker"),
    },
    {
      label: "Cadre",
      value: readAnswer(answers, "contact-builder", "cadre"),
    },
    {
      label: "Plan",
      value: readAnswer(answers, "contact-builder", "plan"),
    },
    {
      label: "Timing",
      value: readAnswer(answers, "contact-builder", "timing"),
    },
    {
      label: "Validation",
      value: readAnswer(answers, "contact-builder", "validation"),
    },
    {
      label: "Pitch d'ouverture",
      value: readAnswer(answers, "contact-builder", "pitch"),
    },
  ]);

  const startupStrengths = compactLines([
    {
      label: "Ce que nous savons deja bien faire",
      value: readAnswer(answers, "startup-strengths", "alreadyDoWell"),
    },
    {
      label: "Ce que nous allons tres bien savoir faire",
      value: readAnswer(answers, "startup-strengths", "willDoWell"),
    },
    {
      label: "La ou nous serons performants",
      value: readAnswer(answers, "startup-strengths", "futurePerformance"),
    },
    {
      label: "Ce qui rend le projet credible",
      value: readAnswer(answers, "startup-strengths", "credibility"),
    },
  ]);

  const clientIssues = compactLines([
    {
      label: "Ce que les clients veulent obtenir ou ameliorer",
      value: readAnswer(answers, "client-issues", "clientGoals"),
    },
    {
      label: "Ce qui les freine",
      value: readAnswer(answers, "client-issues", "clientFriction"),
    },
    {
      label: "Ce qui compte vraiment pour eux",
      value: readAnswer(answers, "client-issues", "clientPriorities"),
    },
    {
      label: "Ce qu'ils veulent obtenir ou eviter",
      value: readAnswer(answers, "client-issues", "clientRisks"),
    },
  ]);

  const valueProposition = compactLines([
    {
      label: "Ce que nous apportons",
      value: readAnswer(answers, "value-and-pitch", "valueResponse"),
    },
    {
      label: "Comment nous traitons le sujet",
      value: readAnswer(answers, "value-and-pitch", "valueMethod"),
    },
    {
      label: "Ce que cela permet",
      value: readAnswer(answers, "value-and-pitch", "valueBenefits"),
    },
  ]);

  const shortPitch = fallbackSentence(
    [
      readAnswer(answers, "value-and-pitch", "pitch30"),
      readAnswer(answers, "contact-builder", "pitch"),
    ],
    "Pitch court a completer.",
  );

  const extendedPitch = fallbackSentence(
    [readAnswer(answers, "value-and-pitch", "pitch60"), shortPitch],
    "Pitch oral a completer.",
  );

  const firstDiscoveryQuestion =
    readAnswer(answers, "contact-builder", "firstDiscoveryQuestion") ||
    "Premiere question de decouverte a preciser.";

  const commitmentNote =
    readAnswer(answers, "final-playbook", "commitmentNote") ||
    "Engagement personnel a preciser.";

  return {
    generatedAt: new Date().toISOString(),
    participantName,
    startup,
    contactStructure,
    startupStrengths,
    clientIssues,
    valueProposition,
    shortPitch,
    extendedPitch,
    firstDiscoveryQuestion,
    commitmentNote,
  };
}
