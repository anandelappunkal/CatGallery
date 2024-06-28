export interface Member {
    id: number;
    linkId: number | null;
  }
  
  export type MemberBillingInfo = {
    memberId: number;
    dependentChildren: number[];
  };
  
  export function determineBilling(members: Member[]): MemberBillingInfo[] {
    const memberMap = new Map<number, Member>();
    const billingInfo: MemberBillingInfo[] = [];
    const visited = new Set<number>();
    const inStack = new Set<number>();
  
    // Build a map for easy lookup
    members.forEach(member => memberMap.set(member.id, member));
  
    function dfs(member: Member, dependents: number[]): boolean {
      if (inStack.has(member.id)) {
        throw new Error('Circular reference detected');
      }
  
      if (visited.has(member.id)) {
        return false;
      }
  
      visited.add(member.id);
      inStack.add(member.id);
  
      if (member.linkId !== null) {
        const linkedMember = memberMap.get(member.linkId);
        if (linkedMember) {
          dependents.push(member.id);
          const hasCircularDependency = dfs(linkedMember, dependents);
          if (hasCircularDependency) {
            return true;
          }
        }
      }
  
      inStack.delete(member.id);
      return false;
    }
  
    members.forEach(member => {
      if (member.linkId === null) { // Only consider parents for billing
        const dependents: number[] = [];
        try {
          dfs(member, dependents);
          billingInfo.push({
            memberId: member.id,
            dependentChildren: dependents,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error('An unexpected error occurred');
          }
        }
      }
    });
  
    return billingInfo;
  }
  