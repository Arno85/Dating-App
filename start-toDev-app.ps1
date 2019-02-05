$appName = "DatingApp"
$FrontEndCmd = "/c cd $appName-SPA && ng serve"
$BackEndCmd = "/c cd $appName.API && dotnet watch run"

Start cmd -Argument $FrontEndCmd -WindowStyle Minimized
Start cmd -Argument $BackEndCmd -WindowStyle Minimized