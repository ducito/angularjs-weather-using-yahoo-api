/**
 * Created by ducito on 13/12/2014.
 */
function HelloCtrl($scope) {
    $scope.name = "bi an";
}
function SimpleController($scope) {
    $scope.students = [
        {name: 'Nguyen Ngoc Duc', city: 'Da Nang'},
        {name: 'Nguyen Van An', city: 'Ha Noi'},
        {name: 'Le Kha Phieu', city: 'Hue'},
        {name: 'Ton Duc Thang', city: 'Hoi An'}
    ];
}