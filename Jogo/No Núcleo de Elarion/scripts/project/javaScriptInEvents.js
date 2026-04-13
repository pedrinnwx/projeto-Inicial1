

const scriptsInEvents = {

	async Folhafase1_Event21_Act1(runtime, localVars)
	{
		const texto = runtime.objects.TextoObjetivo.getFirstInstance();
		texto.text = "Objetivo: Encontre os Fragmentos";
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
