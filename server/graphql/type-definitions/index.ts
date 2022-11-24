/*=============================================== Export typeDefs ===============================================*/

import { SignupInput } from "./inputs/auth/signup"
import { LoginInput } from "./inputs/auth/login"
import { VerifyInput } from "./inputs/auth/verify"
import { ForgotInput } from "./inputs/auth/forgot"
import { ResetInput } from "./inputs/auth/reset"
import { EditUserInput } from "./inputs/user/edit-user"
import { EditPasswordInput } from "./inputs/user/edit-password"

import { User } from "./types/user"
import { QueryUser } from "./types/query/user"
import { MutationAuth } from "./types/mutation/auth"
import { MutationUser } from "./types/mutation/user"

const typeDefs: any = [
    SignupInput,
    LoginInput,
    VerifyInput,
    ForgotInput,
    ResetInput,
    EditUserInput,
    EditPasswordInput,
    User,
    QueryUser,
    MutationAuth,
    MutationUser,
]

export default typeDefs
