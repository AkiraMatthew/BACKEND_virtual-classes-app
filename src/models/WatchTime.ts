import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export interface WatchTimeAttributes {
    seconds: number;
    userId: number;
    episodeId: number;
}

export interface WatchTimeInstace
    extends Model<WatchTimeAttributes>,
        WatchTimeAttributes {}

export const WatchTime = sequelize.define<
    WatchTimeInstace,
    WatchTimeAttributes
>('WatchTime', {
    seconds: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    episodeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
});
