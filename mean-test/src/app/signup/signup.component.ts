import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = {
    email: '',
    password: ''
  }

  email_err_msg = ''


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup() {

    const formData = this.signupForm
    this.http.post('http://localhost:3000/users', formData)
      .toPromise()
      .then((data: any) => {
        this.email_err_msg = ''
        window.localStorage.setItem('auth_token', data.token)
        window.localStorage.setItem('user_info', JSON.stringify(data.user))
        this.router.navigate(['/'])
      })
      .catch(err => {
        if (err.status === 409) {
          this.email_err_msg = 'email existant'
        }
      })
  }

}
