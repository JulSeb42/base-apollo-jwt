/*=============================================== Export typeDefs ===============================================*/

import { SignupInput } from "./inputs/signup"
import { LoginInput } from "./inputs/login"
import { VerifyInput } from "./inputs/verify"
import { ForgotInput } from "./inputs/forgot"
import { ResetInput } from "./inputs/reset"
import { EditUserInput } from "./inputs/edit-user"
import { EditPasswordInput } from "./inputs/edit-password"

import { User } from "./types/user"
import { Query } from "./types/query"
import { Mutation } from "./types/mutation"

const typeDefs: any = [
    SignupInput,
    LoginInput,
    VerifyInput,
    ForgotInput,
    ResetInput,
    EditUserInput,
    EditPasswordInput,
    User,
    Query,
    Mutation,
]

export default typeDefs
