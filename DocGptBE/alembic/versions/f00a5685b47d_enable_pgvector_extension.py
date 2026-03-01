"""enable_pgvector_extension

Revision ID: f00a5685b47d
Revises: 
Create Date: 2026-03-01 17:06:59.770676

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f00a5685b47d'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute('CREATE EXTENSION IF NOT EXISTS vector;')


def downgrade() -> None:
    op.execute('DROP EXTENSION IF EXISTS vector;')
