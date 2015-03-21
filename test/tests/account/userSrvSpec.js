describe('userSrv', function() {
  beforeEach(module('app'));

  describe('isAdmin', function() {

    it('should return false if the roles array does not have an admin', inject(function(userSrv) {

      var user = new userSrv();
      user.roles = ['user'];
      expect(user.isAdmin()).to.be.equal(false);

    }));

    it('should return true if the roles array does have an admin', inject(function(userSrv) {

      var user = new userSrv();
      user.roles = ['admin'];
      expect(user.isAdmin()).to.be.equal(true);

    }));

  });

});
