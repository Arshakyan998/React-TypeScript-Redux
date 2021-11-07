

export const getDate=(data:Date)=>{ 
      
    
      const days=data.getDate() 
      const months=data.getMonth()
      const year=data.getFullYear() 
             
      return {
            days,
            months,
            year
      }
}