export interface FamilyMember {
  id: number;
  name: string;
  parentIds: number[];
  role: string;
  spouseId: number | null;
  birthDate: string;
  deathDate: string | null;
  image: string;
  bio: string;
  slug: string;
  generation: number;
}

export interface FamilyTreeNode extends FamilyMember {
  childNodes: FamilyTreeNode[];
  spouse?: FamilyMember;
  parents: FamilyMember[];
}