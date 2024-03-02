interface HttpRequest {
  body: {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

export class SignUpController {
  handle(httpRequest: HttpRequest): { statusCode: number } {
    const { name } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
      }
    }

    return {
      statusCode: 200,
    }
  }
}
