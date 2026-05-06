export type PresetKey = "weak" | "medium" | "strong" | "empty";

export type Preset = {
  input: string;
  empty?: boolean;
  score?: number;
  label?: string;
  labelColor?: "red" | "amber" | "green";
  questions?: string[];
  criteria?: [string, string][];
};

export const presets: Record<PresetKey, Preset> = {
  weak: {
    input: `Title: Export de données

Faire en sorte que les utilisateurs puissent exporter leurs données.`,
    score: 28,
    label: "Critique",
    labelColor: "red",
    questions: [
      "Quelles données exactement (transactions ? profil ? tout ?) ?",
      "Quel format d'export (CSV, JSON, PDF) ?",
      "Y a-t-il une limite de volume ?",
      "Qui a accès à cette fonctionnalité (rôles, permissions) ?",
      "Que se passe-t-il en cas d'échec d'export ?",
    ],
    criteria: [
      ["GIVEN", "un utilisateur authentifié avec rôle adapté"],
      ["WHEN", "il clique sur le bouton « Exporter mes données »"],
      ["THEN", "un fichier au format spécifié est généré et téléchargé"],
      ["AND", "une notification confirme la réussite ou affiche l'erreur"],
      ["AND", "l'événement est tracé dans les logs d'audit"],
    ],
  },
  medium: {
    input: `Title: Permettre l'export des transactions au format CSV

Description:
En tant qu'utilisateur, je veux pouvoir télécharger l'historique de mes transactions au format CSV pour les importer dans mon outil de comptabilité.

Critères d'acceptation:
- Un bouton "Exporter" est visible sur la page Transactions
- Le fichier généré contient toutes les transactions de l'utilisateur
- Le format est conforme aux standards CSV`,
    score: 64,
    label: "Moyen",
    labelColor: "amber",
    questions: [
      "L'utilisateur peut-il filtrer les transactions à exporter (par date, type) ?",
      "Y a-t-il une limite max de transactions par export ?",
      "Comportement attendu si l'utilisateur n'a aucune transaction ?",
      "Faut-il inclure les transactions annulées ou en attente ?",
    ],
    criteria: [
      ["GIVEN", "un utilisateur sur la page Transactions"],
      ["WHEN", "il sélectionne une plage de dates et clique sur « Exporter »"],
      ["THEN", "un fichier CSV nommé transactions_YYYYMMDD.csv est téléchargé"],
      ["AND", "le CSV contient les colonnes : date, montant, type, libellé, statut"],
      ["AND", "si aucune transaction n'existe, un message clair s'affiche"],
    ],
  },
  strong: {
    input: `Title: [PROJ-1247] Export CSV des transactions avec filtres

Story:
En tant qu'utilisateur premium, je veux exporter mes transactions au format CSV en filtrant par période et type, afin de les analyser dans mon outil de comptabilité (Excel/QuickBooks).

Description détaillée:
- Bouton « Exporter » visible sur la page /transactions pour les comptes Premium
- Modale de configuration : plage de dates (date début / date fin) + types (entrants/sortants/tous)
- Limite : max 10 000 transactions par export, message d'erreur si dépassement
- Format CSV UTF-8, séparateur virgule, en-têtes en français

Dépendances:
- Service de génération CSV (déjà en place pour les factures)
- Endpoint API GET /api/transactions/export

Critères d'acceptation:
1. Le bouton n'est visible que pour les utilisateurs Premium
2. La modale valide les dates (début ≤ fin, max 1 an)
3. Le fichier généré est nommé transactions_[userid]_[date].csv
4. Les transactions annulées sont exclues par défaut
5. Un événement analytics est envoyé à chaque export réussi
6. Une erreur claire s'affiche si > 10 000 résultats`,
    score: 91,
    label: "Prêt",
    labelColor: "green",
    questions: [
      "Le bouton est-il accessible (ARIA) pour les lecteurs d'écran ?",
      "Le téléchargement doit-il être asynchrone si > X lignes (background job) ?",
    ],
    criteria: [
      ["GIVEN", "un user Premium sur /transactions"],
      ["WHEN", "il configure la modale (dates valides, types) et clique sur Exporter"],
      ["THEN", "le CSV est généré et téléchargé avec le nom transactions_[id]_[date].csv"],
      ["AND", "les transactions annulées sont exclues sauf option cochée"],
      ["AND", "un event analytics 'transaction_export' est tracké"],
    ],
  },
  empty: {
    input: "",
    empty: true,
  },
};
