
export function generateHtmlResult(js: any) {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1.0" />
<title></title>
<style type="text/css">
</style>
</head>
<body>
<script type="text/javascript">
(function() {
${js}
})();
</script>
</body>
</html>`;
}