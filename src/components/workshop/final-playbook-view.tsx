import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FinalPlaybook, PlaybookLine } from "@/lib/workshop/types";

type FinalPlaybookViewProps = {
  playbook: FinalPlaybook;
  resumePath: string;
  onCopyResumeLink: () => void;
  onCopyPlaybook: () => void;
  onPrint: () => void;
};

function PlaybookBlock({
  title,
  items,
}: {
  title: string;
  items: PlaybookLine[];
}) {
  return (
    <section className="grid gap-3">
      <div className="flex items-center gap-3">
        <Badge className="rounded-full bg-primary/10 px-3 py-1 text-primary">
          {title}
        </Badge>
      </div>
      <div className="grid gap-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-background/60 p-4 text-sm text-muted-foreground">
            Section encore vide.
          </div>
        ) : (
          items.map((item) => (
            <article
              className="rounded-2xl border border-border/80 bg-background/70 p-4"
              key={`${title}-${item.label}`}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-foreground">
                {item.value}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export function FinalPlaybookView({
  playbook,
  resumePath,
  onCopyResumeLink,
  onCopyPlaybook,
  onPrint,
}: FinalPlaybookViewProps) {
  return (
    <Card className="editorial-card rounded-[2rem] print:shadow-none">
      <CardHeader className="space-y-4 print:pb-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge className="rounded-full bg-accent/20 px-3 py-1 text-accent-foreground">
              Playbook final
            </Badge>
            <CardTitle className="editorial-title text-4xl text-primary">
              {playbook.startup || "Startup a preciser"}
            </CardTitle>
            <p className="text-sm leading-7 text-muted-foreground">
              Support individuel de {playbook.participantName || "participant"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <Button className="rounded-full" onClick={onCopyPlaybook} size="sm">
              Copier le playbook
            </Button>
            <Button
              className="rounded-full"
              onClick={onPrint}
              size="sm"
              variant="outline"
            >
              Imprimer
            </Button>
            <Button
              className="rounded-full"
              onClick={onCopyResumeLink}
              size="sm"
              variant="outline"
            >
              Copier le lien de reprise
            </Button>
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground print:hidden">
          Lien personnel de reprise: {resumePath}
        </p>
      </CardHeader>
      <CardContent className="grid gap-8 print:gap-6">
        <PlaybookBlock
          items={playbook.contactStructure}
          title="Structure de prise de contact"
        />
        <PlaybookBlock items={playbook.startupStrengths} title="Forces startup" />
        <PlaybookBlock
          items={playbook.clientIssues}
          title="Enjeux des interlocuteurs"
        />
        <PlaybookBlock
          items={playbook.valueProposition}
          title="Proposition de valeur"
        />

        <Separator />

        <section className="grid gap-4">
          <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-primary">
            Pitch court
          </Badge>
          <div className="rounded-3xl border border-border/80 bg-background/70 p-5 text-sm leading-7 text-foreground">
            {playbook.shortPitch}
          </div>
        </section>

        <section className="grid gap-4">
          <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-primary">
            Version orale 1 minute
          </Badge>
          <div className="rounded-3xl border border-border/80 bg-background/70 p-5 text-sm leading-7 text-foreground">
            {playbook.extendedPitch}
          </div>
        </section>

        <section className="grid gap-4">
          <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-primary">
            Premiere question de decouverte
          </Badge>
          <div className="rounded-3xl border border-border/80 bg-background/70 p-5 text-sm leading-7 text-foreground">
            {playbook.firstDiscoveryQuestion}
          </div>
        </section>

        <section className="grid gap-4">
          <Badge className="w-fit rounded-full bg-accent/20 px-3 py-1 text-accent-foreground">
            Engagement personnel
          </Badge>
          <div className="rounded-3xl border border-border/80 bg-background/70 p-5 text-sm leading-7 text-foreground">
            {playbook.commitmentNote}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
