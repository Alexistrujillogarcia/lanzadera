#!/usr/bin/env bash
# =======================================================================
# nuevo_proyecto.sh — crea un proyecto nuevo a partir de la base de la skill
# -----------------------------------------------------------------------
# Uso:
#   bash nuevo_proyecto.sh <carpeta-destino>
#
# Copia assets/presentacion → <destino>/presentacion
#       assets/propuesta    → <destino>/propuesta
# y crea <destino>/unidades/ (material original) y <destino>/docs/ (brief).
#
# NUNCA sobrescribe: si un fichero ya existe en el destino, lo salta y
# avisa. Así se puede volver a ejecutar sobre un proyecto a medias para
# reponer solo lo que falte (por ejemplo, un icono borrado).
# =======================================================================
set -euo pipefail

if [ $# -ne 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Uso: bash nuevo_proyecto.sh <carpeta-destino>" >&2
  exit 2
fi

AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSETS="$(cd "$AQUI/../assets" && pwd)"
DESTINO="$1"

mkdir -p "$DESTINO"
DESTINO="$(cd "$DESTINO" && pwd)"

copiados=0
saltados=0

copiar_arbol() {   # copiar_arbol <origen> <destino>
  local origen="$1" destino="$2" rel
  while IFS= read -r -d '' f; do
    rel="${f#"$origen"/}"
    if [ -e "$destino/$rel" ]; then
      echo "  ya existe, se salta: ${destino#"$DESTINO"/}/$rel"
      saltados=$((saltados + 1))
    else
      mkdir -p "$(dirname "$destino/$rel")"
      cp -p "$f" "$destino/$rel"
      copiados=$((copiados + 1))
    fi
  done < <(find "$origen" -type f ! -name '.DS_Store' ! -name '*.pdf' -print0 | sort -z)
}

echo "Proyecto: $DESTINO"
copiar_arbol "$ASSETS/presentacion" "$DESTINO/presentacion"
copiar_arbol "$ASSETS/propuesta" "$DESTINO/propuesta"
mkdir -p "$DESTINO/unidades" "$DESTINO/docs"

echo "Copiados: $copiados ficheros · saltados (ya existían): $saltados"
echo "Carpetas listas: presentacion/ propuesta/ unidades/ docs/"
echo
echo "Siguientes pasos:"
echo "  1. Copia el material original a unidades/ y extrae el texto:"
echo "       python3 -I $AQUI/extraer_contenido.py unidades/* --salida unidades/texto"
echo "  2. Escribe docs/BRIEF-contenido.md y rellena presentacion/data/unidades.js"
echo "  3. node $AQUI/validar_unidades.mjs $DESTINO/presentacion/data/unidades.js"
echo "  4. NODE_PATH=<carpeta>/node_modules node $AQUI/recorrer.mjs $DESTINO/presentacion/index.html --capturas <carpeta>"
