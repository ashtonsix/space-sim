function EccAnom(ec,m,dp) {
var pi=Math.PI, K=pi/180.0;
var maxIter=30,i=0;
var delta=Math.pow(10,-dp);
var E, F;
m=m/360.0;
form.time.value="t/T="+m;
m=2.0*pi*(m-Math.floor(m));
if (ec<0.8) E=m;else E=pi;
F = E - ec*Math.sin(m) - m;
while ((Math.abs(F)>delta) && (i<maxIter)) {
	E = E - F/(1.0-ec*Math.cos(E));
	F = E - ec*Math.sin(E) - m;
	i = i + 1;
}
angle(ec,E,dp);

E=E/K;
if (i==maxIter) str=""+ i+" (max!)";
else str=""+i;
form.iter.value=str;

return Math.round(E*Math.pow(10,dp))/Math.pow(10,dp);
}
function angle(ec,E,dp) {
K=Math.PI/180.0;
S=Math.sin(E);
C=Math.cos(E);
fak=Math.sqrt(1.0-ec*ec);
phi=Math.atan2(fak*S,C-ec)/K;
form.phi.value=Math.round(phi*Math.pow(10,dp))/Math.pow(10,dp);
}
