import surajgola from './surajgola.json'
import member2 from './member2.json'
import member3 from './member3.json'
import member4 from './member4.json'

// Array of all members
export const MEMBERS_ARRAY = [surajgola, member2, member3, member4]

// Get member by ID
export const getMemberById = (id) => {
  return MEMBERS_ARRAY.find((member) => member.id === id)
}

// Get all members
export const getAllMembers = () => MEMBERS_ARRAY

// Export individual members
export { surajgola, member2, member3, member4 }
