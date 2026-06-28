import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();

  const authUrls = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh'];

  if (authUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  // if (!token) {
  //   return next(req);
  // }

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap((response) => {
          const newToken = response.data?.accessToken!;

          authService.saveToken(newToken);

          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          return next(retryReq);
        }),
        catchError((refreshError) => {
          authService.logoutClientSide();
          return throwError(() => refreshError);
        }),
      );
    }),
  );

  // const cloned = req.clone({
  //   setHeaders: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  //
  // return next(cloned);
};


// eyJhbGciOiJIUzI1NiJ9
//   .eyJyb2xlIjoiUk9MRV9VU0VSIiwic3ViIjoiQXJwaXQiLCJpYXQiOjE3ODI2Mzc1ODQsImV4cCI6MTc4MjYzNzY0NH0
//   .jenMAeDp3dG_ - x5EFt6qj5WoXiV6bsx48fGsexlJXpU;


