module.exports = {
	server 	: {
		ip 		: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
		port    : process.env.OPENSHIFT_NODEJS_PORT || 8099
	}
};
