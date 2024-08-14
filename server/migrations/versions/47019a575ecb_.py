"""empty message

Revision ID: 47019a575ecb
Revises: 5026ef587d34
Create Date: 2024-08-14 08:10:42.604607

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47019a575ecb'
down_revision = '5026ef587d34'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('admin', schema=None) as batch_op:
        batch_op.add_column(sa.Column('closed', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('admin', schema=None) as batch_op:
        batch_op.drop_column('closed')

    # ### end Alembic commands ###