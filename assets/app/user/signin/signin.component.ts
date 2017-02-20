import { Component, OnInit }  from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth-service/auth.service';
import { User }  from "../user-model/user.model";
import { Router } from "@angular/router";

@Component({
        selector: 'app-signin',
        templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit{
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router){};

    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
                .subscribe(
                    data => {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userId);
                        this.router.navigateByUrl('/');
                    },
                    error => console.error(error)
                );
        this.myForm.reset();
    }

    ngOnInit(){
            this.myForm = new FormGroup({
                email: new FormControl(null, [
                    Validators.required,
                    Validators.pattern('([a-z0-9_-])+@([a-z_-])+.([a-z])+{2,4}')
                ]),
                password: new FormControl(null, Validators.required)
            });
    }
}
