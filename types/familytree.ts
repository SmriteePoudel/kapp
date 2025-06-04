export interface FamilyMember {
    id: number;
    name: string;
    parentIds: number[];
    spouseId: number | null;
    birthDate: string;
    deathDate: string | null;
    image: string | null;
    bio: string;
    slug: string | null;
    childIds?: number[];
    generation?: number;
  }
  
  export interface FamilyTreeNode extends FamilyMember {
    childNodes: FamilyTreeNode[];
    spouse?: FamilyMember;
    parents: FamilyMember[];
  }