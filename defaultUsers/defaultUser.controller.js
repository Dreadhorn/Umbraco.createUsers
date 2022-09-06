angular.module("umbraco").controller("Toolbox.DefaultUserController", 
    function DefaultUserController(usersResource) {
        var vm = this;
        vm.page = {}
        vm.createDefaultUser = createDefaultUser
        vm.createAnotherUser = createAnotherUser
        vm.page.createDefaultUserSucess = []
        vm.page.createDefaultUserError = []

        function init() {
            vm.usersViewState = "createDefaultUser"
            vm.page.defaultUsers = [
                { "email": "max.mustermann@gmail.com", "name": "Max Mustermann" }
            ]
        }

        async function createDefaultUser() {
            var results = []
            for (const defaultUser of vm.page.defaultUsers) {
                vm.page.createButtonState = 'busy';

                var newUser = {}
                newUser.name = defaultUser.name
                newUser.email = defaultUser.email
                newUser.userGroups = [{
                    "id": 1,
                    "key": "dce790b1-4cd3-4ecd-a97b-ea22a6452ec3",
                    "alias": "admin",
                }]
                newUser.id = -1;
                newUser.parentId = -1;
                results.push(await usersResource.createUser(newUser).then(
                    returnUser => {
                        return [returnUser ]
                    },
                    error => {
                        console.log(error.data.ModelState.Email[0], newUser.email, error)
                        return [newUser, error ]
                    }
                ))
            }
            results.forEach(result => {
                if (result.length === 1 ){
                    vm.page.createDefaultUserSucess.push(result[0])
                } else {
                    vm.page.createDefaultUserError.push(result[0])
                }
            })
            vm.page.createButtonState = 'success';
            vm.usersViewState = "createDefaultUserResult"            
        }

        function createAnotherUser() {
            
        }

        init()
    }
)


