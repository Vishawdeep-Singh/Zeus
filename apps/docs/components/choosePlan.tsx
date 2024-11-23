import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  
  export function ChoosePlan({handleChoosePlan, activeMembership}: {handleChoosePlan: ()=>void, activeMembership: boolean}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
           className="mt-4 pointer-events-auto z-30 w-full"
           disabled={activeMembership}
          >
            {activeMembership ? <span className="text-green-400" >Active plan</span> : "Choose Plan"}
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                Currently We only support offline payments. Please contact the gym owner for payment.    
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleChoosePlan} >Pay for the plan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  