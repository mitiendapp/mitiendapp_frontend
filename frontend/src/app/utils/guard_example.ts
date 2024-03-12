import { AuthService } from "src/app/services/auth.service"
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const authGuardExample = () => {

    const router = inject(Router);
    const auth = inject(AuthService);

    let isCompany;

    auth.isCompany().subscribe(value =>{
        isCompany = value;
    })

    console.log(isCompany);
    

    if (isCompany) {
        return true;
       
    }
    
    router.navigate(['']);
    return false;
}