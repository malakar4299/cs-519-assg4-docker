module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.msg || (req.body && req.body.msg)) {
        // Add a message to the Storage queue,
        // which is the name passed to the function.
        context.log(req.query.msg)
        context.bindings.msg = req.query.msg;
        context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.query.msg
    };
    context.res = {
        body: "hello"
    }
}
};