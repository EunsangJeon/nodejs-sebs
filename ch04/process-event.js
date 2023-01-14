process.on('unhandledRejection', (error) => {
  console.error(error);
});

function withPromise() {
  return Promise.reject('rejected!!');
}

withPromise().then(() => {
  console.log('done');
});

module.exports = {withPromise};
