# user-structure-management-operations

Endpoints:
 post   /api/users/register   *** register new user ((name, password, boss, role)role can be empty to have ability to register first top boss before register its subordinates, if you register admin you need to set the role)

 post   /api/users/login      *** sign in (name, password)

 post   /api/users/logout     *** logout

 get    /api/users/list       *** get list of users according to the role

 patch  /api/users/resub      *** changes the boss of chosen subordinate (userId, newBossId)
